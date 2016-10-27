import React from 'react';
import UITextualInput from '../index';

export default class UITextualInputDemo extends React.PureComponent {
    state = {
        input: '',
    }

    handleChange = (e) => this.setState({input: e.target.value})

    render() {
        return (
            <div className='ui-spread-even'>
                <div>
                    <h5><code>hidePlaceholderOnFocus=&#123;false&#125;</code></h5>
                    <UITextualInput
                        hidePlaceholderOnFocus={false}
                        inputProps={{
                            placeholder: 'Start typing and I disappear!',
                        }} />
                </div>

                <div style={{marginLeft: '1em'}}>
                    <h5><code>hidePlaceholderOnFocus=&#123;true&#125;</code></h5>
                    <UITextualInput
                        hidePlaceholderOnFocus={true}
                        inputProps={{
                            placeholder: 'Focus on me and I disappear!',
                        }} />
                </div>

                <div style={{marginLeft: '1em'}}>
                    <h5>"controlled" input</h5>
                    <UITextualInput
                        hidePlaceholderOnFocus={true}
                        inputProps={{
                            placeholder: 'Focus on me and I disappear!',
                            onChange: this.handleChange,
                            value: this.state.input,
                        }} />
                </div>
            </div>
        );
    }
}
