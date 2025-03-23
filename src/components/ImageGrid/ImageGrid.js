import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImages } from "../../actions"

import './styles.css';
import Button from '../Button';

class ImageGrid extends Component {
    componentDidMount() {
        this.props.loadImages()
    }

    render() {
        const { images, error, isLoading, loadImages } = this.props;
        return (
            <div className="content">
                <section className="grid">
                    {images.map(image => (
                        <div
                            key={image.id}
                            className={`item item-${Math.ceil(
                                image.height / image.width,
                            )}`}
                        >
                            <img
                                src={image.urls.small}
                                alt={image.user.username}
                            />
                        </div>
                    ))}

                    {/* <a onClick={this.props.loadImages} >Load Images</a> */}
                </section>
                {error ? <div className='error'>{JSON.stringify(error)}</div> : null}
                {console.log(isLoading)}
                <Button
                    onClick={() => !isLoading && loadImages()}
                    loading={isLoading}
                >
                    Load More
                </Button>
            </div>
        );
    }
}
const mapStateToProps = ({ isLoading, images, error }) => ({
    isLoading,
    images,
    error
}
)

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages())
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(ImageGrid)
