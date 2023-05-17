import get_current_theme from "./get_current_theme";

export default function toggle_theme() {
    let current_theme = get_current_theme()
    
    if(current_theme === "dark") {
        document.getElementById("layout").dataset.theme = "light"
        localStorage.setItem("theme", "light")
    } else {
        document.getElementById("layout").dataset.theme = "dark"
        localStorage.setItem("theme", "dark")
    }
}