import { useState } from "react"
import { dogsAPI } from "@/config/api"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface MatchGeneratorProps {
  favoriteDogIds: string[]
}

export const MatchGenerator = ({ favoriteDogIds }: MatchGeneratorProps): JSX.Element => {
  const [matchResult, setMatchResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleGenerateMatch = async () => {
    if (favoriteDogIds.length === 0) return;

    setLoading(true)
    try {
      const data = await dogsAPI.match(favoriteDogIds)
      setMatchResult(data.match)
      setOpen(true)
    } catch (error) {
      console.error("Error generating match:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handleGenerateMatch} disabled={loading || favoriteDogIds.length === 0}>
        {loading ? "Matching..." : "Generate Match"}
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span />
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <p>You have been matched with dog ID: {matchResult}</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default MatchGenerator
