import { toast } from 'react-toastify';
import axios from '../helpers/axios';

const getTodoList = (setLoading, setList) => {
    setLoading(true);
    axios.get('/list')
        .then((response) => {
            console.log('list : ', response?.data);
            setList(response?.data);
        })
        .catch(() => {
        })
        .finally(() => {
            setLoading(false);
        })
}

const addTasktoList = (data, setLoading, setType) => {
    axios.post(`/add-to-list`, data)
        .then(() => {
            toast.success('Added');
        }).catch(() => {
        }).finally(() => {
            setType('');
        })
}

const updatListItem = (itemId, isCompleted) => {

    axios.patch('/update-item', {
        data: {
            id: itemId,
            isCompleted: !isCompleted
        }
    }).then(() => {
    }).catch(() => {
        toast.error('Error while updating.');
    }).finally(() => { })
};

const removeItemFromList = (itemId) => {
    axios.delete(`/remove-item/${itemId}`).then(() => {
    }).catch((error) => {
        toast.error('Error while deleting.');
    }).finally(() => {
    })
}
export { getTodoList, addTasktoList, updatListItem, removeItemFromList };