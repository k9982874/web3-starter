import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from './ui/use-toast'

import { Loader2, LogOut, User } from "lucide-react"
import { trpc } from '@/lib/trpc'

export function MainMenu() {
  const { toast } = useToast()

  const accountBind = trpc.account.bind.useMutation()

  const { address, connector, isConnected } = useAccount({ onConnect: ({ address, connector, isReconnected }) => {
    accountBind.mutateAsync({
      connector: connector!.id,
      wallet: address as string,
    }).then((id) => {
      console.log(id)
    }).catch(err => {
      toast({
        variant: "destructive",
        title: err.message,
      })
    })
  }})

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span onClick={() => disconnect()}>
              Logout
            </span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const metamask = connectors.find(connector => connector.id === 'metaMask')
  if (!metamask) {
    return (<></>)
  }

  return (
    <Button
      onClick={() => connect({ connector: metamask })}
    >
      {metamask.name}
      {isLoading &&
        metamask.id === pendingConnector?.id && <Loader2 /> }
    </Button>
  )
}
