import Tag from "../../model/objects/Tag";
import * as React from "react";

interface Props {
    tags: Tag[]
}

export default class TagListView extends React.Component<Props>{
    render = () =>
    (
        <div>
            {this.props.children}
            {
                this.props.tags.map(tag =>
                <a key={tag.id} className={"btn btn-outline-dark btn-sm mx-1"}> {tag.name} </a>
                )
            }
        </div>
    );
}