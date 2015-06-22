"use strict";

import React from "react";
import { CodeBlock } from "./CodeBlock";

export class FunctionExport extends React.Component {
    renderExamples (expId) {
        if ( this.props.function.examples.length === 0 ) { return null; }

        const id = expId + "-examples";

        const examples = this.props.function.examples.map((example) => {
            const content = example.content.map((block, index) => {
                if ( block.type === "code" ) {
                    return (<CodeBlock
                        key={"code-" + index}
                        onCodeEditorOpened={this.props.onCodeEditorOpened}
                        language={block.language}
                        code={block.content}
                        header={`import { ${this.props.function.name} } from "${this.props.importTarget}";`}
                    />);
                } else if ( block.type === "html" ) {
                    return (<div
                        key={"code-" + index}
                        dangerouslySetInnerHTML={{__html: block.content }}
                    />)
                }
            });

            const exampleId = id + "-" + example.title.toLowerCase().replace(/[^\w]+/g, "_");
            return (<section key={example.title} id={exampleId} className="function-section__example">
                <h6 className="function-section__example__header">
                    <span dangerouslySetInnerHTML={{__html: example.title}} />
                    { " " }
                    <a className="anchor" href={"#" + exampleId}>{"#"}</a>
                </h6>
                { content }
            </section>)
        });

        return (<section id={id} className="function-section__examples">
            <h5 className="function-section__examples__header">
                <span>{"examples"}</span>
                { " " }
                <a className="anchor" href={"#" + id}>{"#"}</a>
            </h5>
            { examples }
        </section>);
    }

    renderReturns (expId) {
        const id = expId + "-returns";
        return (<section id={id} className="function-section__returns">
            <h5 className="function-section__returns__header">
                <span>{"Returns"}</span>
                { " " }
                <a className="anchor" href={"#" + id}>{"#"}</a>
            </h5>
            <ul>
                <li>
                    <code>{this.props.function.returns.type}</code>
                </li>
            </ul>
        </section>)
    }

    renderParameters (expId) {
        const parameters = [{
            name: "this",
            type: this.props.function.thisParameter.type,
            description: this.props.function.thisParameter.description,
        }].concat(this.props.function.parameters).map((p) => {
            const description = !p.description ? null :
                (<span>
                    { " " }
                    <span dangerouslySetInnerHTML={{__html: p.description}} />
                </span>);

            return (<li key={p.name}>
                <code>{(p.rest ? "..." : "") + p.name}</code>
                { " " }
                <code>{p.type}</code>
                { description }
            </li>);
        });

        const id = expId + "-parameters";
        return (<section id={id} className="function-section__parameters">
            <h5 className="function-section__parameters__header">
                <span>{"Parameters"}</span>
                { " " }
                <a className="anchor" href={"#" + id}>{"#"}</a>
            </h5>
            <ul>
                { parameters }
            </ul>
        </section>)
    }

    renderTypeParameters (expId) {
        const typeParameters = this.props.function.typeParameters
            .filter((p) => p.description !== "")
            .map((p) => {
                const description = !p.description ? null :
                    (<span>
                        { " " }
                        <span dangerouslySetInnerHTML={{__html: p.description}} />
                    </span>);
                return (<li key={p.name}>
                    <code>{p.name}</code>
                    { description }
                </li>);
            });

        if ( typeParameters.length === 0 ) { return null; }

        const id = expId + "-type_parameters";
        return (<section id={id} className="function-section__type-parameters">
            <h5 className="function-section__type-parameters__header">
                <span>{ "Type Parameters" }</span>
                { " " }
                <a className="anchor" href={"#" + id}>{"#"}</a>
            </h5>
            <ul>
                { typeParameters }
            </ul>
        </section>)
    }

    renderDescription (expId) {
        const id = expId + "-description";
        return (<section
            id={id}
            dangerouslySetInnerHTML={{__html: this.props.function.description}}
        />);
    }

    renderImportExample (expId) {
        return (<CodeBlock
            language="javascript"
            onCodeEditorOpened={this.props.onCodeEditorOpened}
            code={`import { ${this.props.function.name} } from "${this.props.importTarget}";`}
        />);
    }

    render () {
        const id = "categories-" + this.props.categoryName + "-modules-" +
            this.props.moduleName + "-exports-" + this.props.function.name;

        const typeParameters = this.props.function.typeParameters.map((p) => p.name).join(", ");

        return (<section id={id} className="function-section">
            <h4 className="function-section__header">
                <code>{
                    this.props.function.name +
                        (typeParameters ? "<" + typeParameters + ">" : "") + "()"
                }</code>
                { " " }
                <a className="anchor" href={"#" + id}>{"#"}</a>
            </h4>
            { this.renderImportExample(id) }
            { this.renderDescription(id) }
            { this.renderTypeParameters(id) }
            { this.renderParameters(id) }
            { this.renderReturns(id) }
            { this.renderExamples(id) }
        </section>)
    }
};
