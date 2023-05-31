import { useEffect } from "react"

const useHotkeySave = (callMethod: () => void) => {
    useEffect(() => {
        // check if the key is "s" with ctrl key
        const keyDown = (event: KeyboardEvent) => {
            if (event.key === "s" && event.ctrlKey || event.key === "ស" && event.ctrlKey) { // also listen to khmer keyboard ស

                // prevent the browser from opening the save dialog
                event.preventDefault()

                // call our callback method
                callMethod()
            }
        }

        // listen to keydown events
        document.addEventListener("keydown", keyDown)

        // stop listening on component destory
        return () => {
            document.removeEventListener("keydown", keyDown)
        }
    })
}
export default useHotkeySave