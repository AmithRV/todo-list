import { toast } from 'react-toastify';
import axios from '../helpers/axios';

const getTodoList = (setLoading, setList) => {
    setLoading(true);
    axios.get('/list')
        .then((response) => {
            setList(response?.data);
        })
        .catch(() => {
            toast.error('something went wrong.');
        })
        .finally(() => {
            setLoading(false);
        })
}

const addTasktoList = (data, setType) => {
    axios.post(`/add-to-list`, data)
        .then(() => {
        }).catch(() => {
            toast.error('something went wrong.');
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
    }).catch(() => {
        toast.error('Error while deleting.');
    }).finally(() => {
    })
}
export { getTodoList, addTasktoList, updatListItem, removeItemFromList };