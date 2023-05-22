import get_current_theme from "./get_current_theme";

export default function toggle_theme() {
    const current_theme = get_current_theme()
    const layout_element = document.getElementById("layout")

    if(current_theme === "dark") {
        layout_element ? layout_element.dataset.theme = "light" : null
        localStorage.setItem("theme", "light")
    } else {
        layout_element ? layout_element.dataset.theme = "dark" : null
        localStorage.setItem("theme", "dark")
    }
}