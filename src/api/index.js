import axios from 'axios';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get('/Uw5CrX'); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching quiz data:", error); 
    return null; 
  }
};
