import axios from "axios"

export async function weatherFetch(cityName: string | undefined) {
    const API_KEY = "dcf70e63120d0d30055138f4f24d0f4f"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=pt_br`
    const res = await axios.get(URL)
    const data = await res.data

    return await data
}
