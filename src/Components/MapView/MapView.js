import { divIcon } from 'leaflet'
import PropTypes from 'prop-types'
import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

function MapView (props) {
    const { locationArray } = props

    const maxBounds = [
        [90, 270],
        [-90, -240]
    ]

    const icons = {
        // 1 - 100
        xxSmall: divIcon({ className: 'map-view__marker pink', iconSize: [12, 12] }),
        // 101 - 500
        xSmall: divIcon({ className: 'map-view__marker pink', iconSize: [16, 16] }),
        // 501 - 1000
        small: divIcon({ className: 'map-view__marker pink', iconSize: [24, 24] }),
        // 1001 - 5000
        normal: divIcon({ className: 'map-view__marker purple', iconSize: [32, 32] }),
        // 5001 - 10000
        large: divIcon({ className: 'map-view__marker purple', iconSize: [48, 48] }),
        // 10001 - 50000
        xLarge: divIcon({ className: 'map-view__marker red', iconSize: [72, 72] }),
        // 50001 - up
        xxLarge: divIcon({ className: 'map-view__marker red', iconSize: [96, 96] })
    }

    const markerElement = locationArray.map((location) => {
        const {
            id,
            country_code,
            country, province,
            latest: { confirmed },
            coordinates: { latitude, longitude }
        } = location

        let title = country

        if (province !== '' && province !== country) {
            title = `${province}, ${country}`
        }

        let markerIcon = icons.xxSmall

        if (confirmed >= 101 && confirmed <= 500) {
            markerIcon = icons.xSmall
        }

        else if (confirmed >= 501 && confirmed <= 1000) {
            markerIcon = icons.normal
        }

        else if (confirmed >= 1001 && confirmed <= 5000) {
            markerIcon = icons.large
        }

        else if (confirmed >= 5001 && confirmed <= 50000) {
            markerIcon = icons.xLarge
        }

        else if (confirmed >= 50001) {
            markerIcon = icons.xxLarge
        }

        return (
            <Marker
                key={`${id}-${country_code}`}
                position={[ latitude, longitude]}
                icon={markerIcon}>
                <Popup>{title}</Popup>
            </Marker>
        )
    })
    return (
        <Map c
            className='map-view'
            center={[13, 100]}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            minZoom={2}zoom={5}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {markerElement}
        </Map>
    )
}

MapView.propTypes = {
    locationArray: PropTypes.array.isRequired
}

export default MapView
