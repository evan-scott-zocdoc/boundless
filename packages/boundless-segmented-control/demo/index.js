import React from 'react';
import SegmentedControl from '../index';
import Image from '../../boundless-image/index';

export default class SegmentedControlDemo extends React.PureComponent {
    state = {
        options: [{
            selected: true,
            content: 'Planets',
            value: 'planets',
        }, {
            selected: false,
            content: 'Nebulae',
            value: 'nebulae',
        }, {
            selected: false,
            content: 'Galaxies',
            value: 'galaxies',
        }],
    }

    handleOptionSelected = (value) => {
        this.setState({
            options: this.state.options.map(function transformer(option) {
                return {...option, selected: option.value === value};
            }),
        });
    }

    getSelectedOptionValue() {
        return this.state.options.find((option) => option.selected === true).value;
    }

    renderContent() {
        switch (this.getSelectedOptionValue()) {
        case 'planets':
            return (
                <div className='spread'>
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/9/8228/8497927563_00dcb3fe09_b.jpg'
                        alt='Mercury' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='http://vedichealing.com/wp-content/uploads/2013/03/Venusflickr-300x300.jpg'
                        alt='Venus' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/3/2084/2222523486_5e1894e314_b.jpg'
                        alt='Earth' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c2.staticflickr.com/4/3079/3191775310_bc6a8234d3.jpg'
                        alt='Mars' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c2.staticflickr.com/4/3935/15652333232_6b44ff9cbf_b.jpg'
                        alt='Jupiter' />
                </div>
            );

        case 'nebulae':
            return (
                <div className='spread'>
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/9/8244/8663227196_1e3719be69_b.jpg'
                        alt='Horsehead' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/5/4113/5216868239_b53b8d5e80_b.jpg'
                        alt='Dust of Orion' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/3/2796/4398656115_ceb9a987ce_b.jpg'
                        alt='Carina' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/1/468/19550653503_e4e0017579_b.jpg'
                        alt='Trifid' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://s-media-cache-ak0.pinimg.com/736x/df/5f/71/df5f7105d0de64246395fdda57f51ddf.jpg'
                        alt='Medusa' />
                </div>
            );

        case 'galaxies':
            return (
                <div className='spread'>
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/5/4128/5043159769_f382995a9b_b.jpg'
                        alt='Triangulum (M33)' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c1.staticflickr.com/7/6215/6242076308_d01dccd1b4_b.jpg'
                        alt='Andromeda (M31)' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='https://c2.staticflickr.com/6/5236/5896162967_a656cf460a_b.jpg'
                        alt='Milky Way Galactic Core' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='http://farm9.static.flickr.com/8668/15864469305_b3db67dd1d_m.jpg'
                        alt='M77' />
                    <Image
                        displayAsBackgroundImage={true}
                        src='http://36.media.tumblr.com/687f0a2cd276b3d0013aa36aa2908845/tumblr_mmhvnnIx4L1qgvl7lo1_500.jpg'
                        alt='Whirlpool (M51)' />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <p>Which astronomical features would you like to view?</p>
                <SegmentedControl
                    ref='control'
                    options={this.state.options}
                    onOptionSelected={this.handleOptionSelected} />
                <br />
                {this.renderContent()}
            </div>
        );
    }
}