import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  profile: User | null
  setProfile: Dispatch<SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: Dispatch<SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchase)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchase([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile: profile,
        setProfile,
        extendedPurchase,
        setExtendedPurchase,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
