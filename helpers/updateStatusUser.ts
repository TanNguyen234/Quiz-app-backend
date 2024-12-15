import User from '../api/v1/userApi/models/user.model';

const updateStatus = async (id: string, status: string): Promise<void> => {
    console.log(id,' is ',status)
    await User.updateOne({
        _id: id
    },{
        statusOnline: status
    })
}

export default updateStatus;