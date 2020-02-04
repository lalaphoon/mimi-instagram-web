import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import { AroundMarker } from './AroundMarker';
import {
    POSITION_KEY,
} from '../constants';

class NormalAroundMap extends React.Component {
    state = {
        isOpen : true,
    }

    onToggleOpen = () => {
        this.setState(({isOpen}) => ({
            isOpen: !isOpen,
        }));
    }

    render() {
        const position = {"latitude":37,"longitude":-120};//JSON.parse(localStorage.getItem(POSITION_KEY));

        return (
            <GoogleMap defaultZoom={8} defaultCenter={{ lat: position.latitude, lng: position.longitude }}>
                {this.props.posts.map((post) => (
                    <AroundMarker
                        post={post}
                        key={post.url}
                    />
                ))}
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));