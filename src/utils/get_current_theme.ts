export default function get_current_theme() {
    const layout_element = document.getElementById("layout")
    if(layout_element) {
        return layout_element.dataset.theme
    } else {
        return null
    }
}