import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');
const HomePage = () => {

    const handlerToast = () => {
        toast.error('kfldfnl')
    }

    return (
        <div>
            <button onClick={notify} >ok</button>
            <Toaster />
        </div>
    );
};

export default HomePage;