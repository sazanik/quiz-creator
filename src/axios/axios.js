import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-cc6f2-default-rtdb.europe-west1.firebasedatabase.app/'
})