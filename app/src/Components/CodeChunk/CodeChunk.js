import './CodeChunk.css';

const CodeChunk = ({ obj }) => {
    return (
        <pre className="code">
            <code>{obj}</code>
        </pre>
    );
};

export default CodeChunk;
