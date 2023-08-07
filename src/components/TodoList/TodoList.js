import { Link } from "react-router-dom";

const TodoList = (props) => {
    return (
        <div className="TodoList">
            <section>
                <h1>Дела</h1>
                <table className='table is-hoverable is-fullwidth'>
                    <tbody>
                        {props.list.map((item) => (
                            <tr key={item.key}>
                                <td>
                                    <Link to={`/${item.key}`}>
                                    {item.done && <del>{item.title}</del>}
                                    {!item.done && item.title}
                                    </Link>
                                </td>
                                <td>
                                    <button 
                                    className="button is-success" 
                                    title="Пометить как сделанное"
                                    disabled={item.done}
                                    onClick={() => props.setDone(item.key)}>Сделано!</button>
                                </td>
                                <td>
                                    <button 
                                    onClick={() => props.setDelete(item.key)}
                                    className="button is-danger"
                                    title="Удалить">Удалить?</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}









export default TodoList;