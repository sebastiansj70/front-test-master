import axios from "axios";
import { Image } from "../types/Image";

const API_URL = 'http://localhost:3100/images'

export const fetchImages = async (): Promise<Image[]> => {
    try {
        const response = await axios.get(API_URL)
        return response.data;
    } catch (error) {
        console.error('Error fetching images', error)
        throw new Error('Error fetching images');
    }
}


export const likeImage = async (id: number) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/likes`)
        console.log('========response============================');
        console.log(response);
        console.log('====================================');
    } catch (error) {
        console.error('Error liking image', error);
        throw new Error('Error liking image');
    }
}