import UpdateItem from '../components/UpdateItem'

const Update = ({ query }) => {
    console.log('query', query)
    return (
        <div>
            <UpdateItem id={query.id} />
        </div>
    );
};

export default Update;
