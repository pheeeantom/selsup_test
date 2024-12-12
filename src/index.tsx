import React from "react";
import { createRoot } from 'react-dom/client';

interface Param {
    id: number;
    name: string;
    type: 'string';
}
interface ParamValue {
    paramId: number;
    value: string;
}
interface Model {
    paramValues: ParamValue[];
}
interface Props {
    params: Param[];
    model: Model;
}
interface State {
    model: Model;
}
interface PropsParam {
    param: Param;
    paramVal: ParamValue;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}
class Init extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return <ParamEditor params={[
            {
                "id": 1,
                "name": "Назначение",
                "type": "string",
            },
            {
                "id": 2,
                "name": "Длина",
                "type": "string",
            }
        ]} model={{
            "paramValues": [
                {
                    "paramId": 1,
                    "value": "повседневное"
                },
                {
                    "paramId": 2,
                    "value": "макси"
                }
            ] 
        }}/>
    }
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.state = { model: this.props.model };
    }

    public getModel(): Model {
        return this.state.model;
    }

    handleInput(e: React.ChangeEvent<HTMLInputElement>, id: number): void {
        this.setState(prevState => ({
            model: {
                paramValues: prevState.model.paramValues.map(paramVal => {
                    //console.log((e.target as HTMLInputElement).value);
                    if (paramVal.paramId === id) {
                        return ({
                            paramId: id,
                            value: (e.target as HTMLInputElement).value
                        });
                    }
                    return paramVal;
            })}
        }))
    }

    render() {
        return (
            <div>
                <button onClick={() => console.log(this.getModel())}>Tap me</button>
                {this.props.params.map(param => {
                    if (param.type === 'string') {
                        return (
                            <ParamRenderer key={param.id} param={param} paramVal={this.state.model.paramValues.find(paramVal => paramVal.paramId === param.id)} handleInput={this.handleInput} />
                        );
                    }
                    else {
                        return <></>;
                    }
                })}
            </div>
        );
    }
}

class ParamRenderer extends React.Component<PropsParam, State> {
    constructor(props: PropsParam) {
        super(props);
    }

    render() {
        return (
            <div>
                <label htmlFor={'param' + this.props.param.id}>{this.props.param.name}</label>
                <input id={'param' + this.props.param.id} value={this.props.paramVal.value} 
                    onChange={(e) => this.props.handleInput(e, this.props.param.id)}/>
            </div>
        );
    };
}

const root = createRoot(
    document.getElementById('root')
);

root.render(<Init/>);