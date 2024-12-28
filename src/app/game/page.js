import Grid from "./components/Grid";

export default function Home() {
    return (
        <div>
            <h1>TicTacTWO</h1>
            <div style={{ width: '200px', margin: '0 auto'}}>
                <Grid />
            </div>
        </div>
    )
}