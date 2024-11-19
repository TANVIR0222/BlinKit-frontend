
const uploadImage = async (image, id,imageUploade) => {
    try {
      console.log(image);
  
      const formData = new FormData();
      formData.append("image", image);
    
      const response = await imageUploade({id,formData}).unwrap();
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  
  export default uploadImage;