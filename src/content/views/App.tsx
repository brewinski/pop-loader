import PopLoader from '@/assets/pop-loader.png'
import Download from "@/assets/download.png"
import Popout from '@/assets/pop-out.png'
import IncognitoOpen from '@/assets/incognito-open.png'
import { useState, useEffect } from 'react'
import './App.css'

const IncognitoOpenUrl = chrome.runtime.getURL(IncognitoOpen)
const PopLoaderUrl = chrome.runtime.getURL(PopLoader)
const DownloadUrl = chrome.runtime.getURL(Download)
const PopoutUrl = chrome.runtime.getURL(Popout)

function extractMP4UrlsFromScripts(): string[] {
  const urls = new Set<string>();

  document.querySelectorAll("script").forEach(script => {
    const text = script.textContent || "";

    const matches = text.match(/https?:\/\/[^\s"'`]+\.mp4/g);
    if (matches) {
      matches.forEach(u => urls.add(u));
    }
  });

  return [...urls];
}

function reportIfChanged(setUrls: (urls: string[]) => void) {
  const urls = extractMP4UrlsFromScripts()
  setUrls(urls)
}

// Send to extension UI or background service worker
// chrome.runtime.sendMessage({ type: "VIDEO_URLS", urls: videoUrls });

function App() {
  const [urls, setUrls] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show)

  const hasUrls = urls.length > 0

  useEffect(() => {
    // Observe DOM changes
    const observer = new MutationObserver(() => {
      reportIfChanged(setUrls);
    });

    // Start observing page for changes
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!hasUrls) return <></>

  return (
    <div className="popup-container">
      {show && (
        <div className={`popup-content ${show ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href="#"
            onClick={() => {
              console.log("[brewinski]: triggered incognito window open", "url", urls[0])
              chrome.runtime.sendMessage({
                type: "OPEN_VIDEO_INCOGNITO",
                url: urls[0]
              })
            }}
          >
            <img
              src={IncognitoOpenUrl}
              alt="CRXJS logo"
              className="round-button"
            />
          </a>
          <a href={urls[0] + "?cache=" + crypto.randomUUID()} target='_blank'>
            <img
              src={PopoutUrl}
              alt="CRXJS logo"
              className="round-button"
            />
          </a>
          <a
            href="#"
            onClick={() => {
              console.log("[brewinski]: triggered file download", "url", urls[0])
              chrome.runtime.sendMessage({
                type: "DOWNLOAD_VIDEO",
                url: urls[0]
              })
            }}>
            <img
              src={DownloadUrl}
              alt="CRXJS logo"
              className="round-button"
            />
          </a>
        </div>
      )}
      <button className="toggle-button" onClick={toggle}>
        <img src={PopLoaderUrl} alt="CRXJS logo" className="button-icon" />
      </button>
    </div>
  )
}

export default App
