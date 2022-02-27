import React, { useEffect, useState } from 'react';
import { useChromeSyncStorage } from './useChromeSyncStorage';

// Keeps blocked sites in sync with useChromeSyncStorage
export function useBlockHosts() {
  const { storageValue, partialUpdateStorageValue } = useChromeSyncStorage();

  const [blockedHosts, setBlockedHosts] = useState(storageValue)

  useEffect(() => {
    setBlockedHosts(storageValue)
  }, [storageValue])

  const blockHost = (host) => partialUpdateStorageValue(host, true)
  const unblockHost = (host) => partialUpdateStorageValue(host, false)

  return { blockHost, unblockHost, blockedHosts }
}