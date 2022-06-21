import './Track.css';

export function Track(){
    return (
        <div className="Track">
            <div className="Track-information">
              {/* <h3><!-- track name will go here --></h3> */}
              {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
            </div>
            <button className="Track-action">{renderAction}</button>
        </div>
    );
}

function renderAction(props) {
    if (props.isRemoval) {
        '+'
    } else {
        '-'
    }
}