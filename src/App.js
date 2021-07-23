import React, { useState, useEffect } from 'react';
// npm install react-markdown, and then import
import ReactMarkdown from 'react-markdown'
import './App.css';

export default function App() {
  const [markdown, setMarkdown] = useLocalData('markdown-app', '# sup')

  // implement local storage custom useState hook
  function useLocalData(key, defaultVal = '') {
    const [state, setState] = useState(() => {
      const localData = window.localStorage.getItem(key)

      if (localData) {
        return JSON.parse(localData)
      }
      return defaultVal
    })

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
  }

  function handleChangeText(e) {
    setMarkdown(e.target.value)
  }

  return (
    <div className="app" >
      <textarea value={markdown} onChange={handleChangeText} />
      <ReactMarkdown className="preview">{markdown}</ReactMarkdown>
    </div>
  );
}
