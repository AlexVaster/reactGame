import ReactDOM from "react-dom";
import styles from './Field.module.css';

const Label = (props) => {
    return <h1>Next player: {props.name}</h1>;
};

const Square = (props) => {
    return <button className={styles.square}>{props.value}</button>;
};

const Field = (props) => {
    return (
        <div className={styles.field}>
            <div className="game-status"></div>
            <div className={styles.fieldRow}>
                <Square value={0}></Square>
                <Square value={1}></Square>
                <Square value={2}></Square>
            </div>
            <div className={styles.fieldRow}>
                <Square value={3}></Square>
                <Square value={4}></Square>
                <Square value={5}></Square>
            </div>
            <div className={styles.fieldRow}>
                <Square value={6}></Square>
                <Square value={7}></Square>
                <Square value={8}></Square>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Label></Label>
            <Field></Field>
        </div>
    )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const app = <App></App>;
root.render(app);