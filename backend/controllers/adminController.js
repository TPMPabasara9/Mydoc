//Api for adding a doctor

const addDoctor = async (req, res) => { 
    try {
        const {name,email,speciality,password,image,degree,experience,about,available,address,fee} = req.body;
        const imageFile = req.file

        console.log({name,email,speciality,password,image,degree,experience,about,available,fee,address,imageFile})
    } catch (error) {
        
    }
}

export {addDoctor}