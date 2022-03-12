/* global chrome */
import React, { useEffect, useState } from 'react';

/**
 * This hook keeps chrome storage up to date with the state in `storageValue`
 */
export function useChromeSyncStorage() {
  const [storageValue, setStorageValue] = useState({})
  const [loading, setLoading] = useState(false);

  const partialUpdateStorageValue = (key, value) => {
    if (storageValue[key] !== value) {
      setStorageValue({
        ...storageValue,
        [key]: value,
      });
    }
  }

  useEffect(() => {
    setLoading(true);
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      const newState = Object.assign({}, Object.entries(changes)
        .map(
          ([key, { newValue }]) => ({
            [key]: newValue
          })
        ));
      partialUpdateStorageValue(newState)
    });

    async function loadAllStorage() {
      chrome.storage.local.get(null, getResult => {
        setLoading(false);
        setStorageValue(getResult)
      })
    }

    loadAllStorage();
  }, []);

  useEffect(() => {
    chrome.storage.local.set(storageValue)
  }, [storageValue])

  return {
    storageValue,
    setStorageValue,
    partialUpdateStorageValue,
    loading
  }
}