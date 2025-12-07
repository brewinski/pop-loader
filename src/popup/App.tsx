import './App.css'
import PopLoader from '@/assets/pop-loader.png'
const PopLoaderUrl = chrome.runtime.getURL(PopLoader)

export default function App() {
  return (
    <div>
      <img height="200" width="200" src={PopLoaderUrl} alt="CRXJS logo" className="button-icon" />
    </div>
  )
}
