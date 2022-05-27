import React, { useEffect, useState, useMemo } from 'react'
import cn from 'classnames';
import Router from 'next/router';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import styles from './styles.module.scss'

const pushQuery = (query) => {
    Router.push(
        LinkCreator.toQuery(query, Router.pathname),
        LinkCreator.toQuery(query, Router.pathname),
        { scroll: false }
    );
}

const applyFilter = ({ type, value }) => {
    const parsed = qs.parse(location.search);
    parsed.page = 1;
    switch (type) {
        case 'genre':

            if (!parsed.genres) parsed.genres = [value];
            else if (typeof parsed.genres === 'string') {
                if (parsed.genres === value) delete parsed.genres;
                else parsed.genres = [parsed.genres, value];
            }
            else {
                if (parsed.genres.includes(value)) {
                    parsed.genres = parsed.genres.filter(g => g !== value);
                }
                else parsed.genres.push(value);
            }

            break;
        
        case 'artistType':
            if (!parsed.types) parsed.types = [value];
            else if (typeof parsed.types === 'string') {
                if (parsed.types === value) delete parsed.types;
                else parsed.types = [parsed.types, value];
            }
            else {
                if (parsed.types.includes(value)) {
                    parsed.types = parsed.types.filter(g => g !== value);
                }
                else parsed.types.push(value);
            }

            break;
    
        case 'compensationModel':
            if (parsed.compensationModel === value) delete parsed.compensationModel;
            else parsed.compensationModel = value;
            break;
    
        case 'search':
            if (!value) delete parsed.search;
            else parsed.search = value;
            break;

        default:
            break;
        }
    pushQuery(parsed);
}

const SearchForCollaboratorsNew = (props) => {
    const {
      genres,
      search,
      selectedCompensationModel = '',
      selectedGenres = [],
      selectedTypes = [],
      userTypes = [],
    } = props;
    const compensationModels = ['paid', 'collaboration']

    const [isOpened, setIsOpened] = useState('false');
    const [currentContent, setCurrentContent] = useState(null);

    let preparedCompensationModels = useMemo(() => compensationModels.map(model => {
        let selected = false;
        let disabled = false;
        if (selectedCompensationModel && selectedCompensationModel !== model) disabled = true;
        if (selectedCompensationModel === model) selected = true;
        return {
            title: model,
            value: model,
            disabled,
            selected
        }
    }), [selectedCompensationModel])

    let preparedGenres = useMemo(() => genres.map(genre => {
        let selected = false;
        if (typeof selectedGenres === 'string' && selectedGenres === genre._id) selected = true;
        else if (Array.isArray(selectedGenres) && selectedGenres.includes(genre._id)) selected = true;
        return {
            title: genre.name,
            value: genre._id,
            disabled: false,
            selected
        }
    }), [genres]);

    let preparedArtistTypes = useMemo(() => userTypes.map(type => {
        let selected = false;
        if (typeof selectedTypes === 'string' && selectedTypes === type.key) selected = true;
        else if (Array.isArray(selectedTypes) && selectedTypes.includes(type.key)) selected = true;
        return {
            title: type.value,
            value: type.key,
            disabled: false,
            selected
        }
    }), [genres]);

    const searchChangeHandler = (event) => {
        const value = event.target.value;
        applyFilter({
            type: 'search',
            value
        });
    }

    const filterClickHandler = (filterName) => {
        if (filterName === currentContent) setCurrentContent(null);
        else setCurrentContent(filterName);
    }

    let preparedSelectedFilters = useMemo(() => {
        let selectedFilters = [];

        if (selectedCompensationModel) selectedFilters.push({
            type: 'compensationModel',
            title: selectedCompensationModel,
            value: selectedCompensationModel,
            disabled: false,
            selected: true
        });

        if (typeof selectedGenres === 'string') selectedFilters.push({
            type: 'genre',
            title: genres.find(g => g._id === selectedGenres).name,
            value: selectedGenres,
            disabled: false,
            selected: true
        });
        else if (selectedGenres) selectedFilters = selectedFilters.concat(selectedGenres.map(genre => ({
            type: 'genre',
            title: genres.find(g => g._id === genre).name,
            value: genre,
            disabled: false,
            selected: true
        })));

        if (typeof selectedTypes === 'string') selectedFilters.push({
            type: 'artistType',
            title: userTypes.find(t => t.key === selectedTypes).value,
            value: selectedTypes,
            disabled: false,
            selected: true
        });
        else if (selectedTypes) selectedFilters = selectedFilters.concat(selectedTypes.map(type => ({
            type: 'artistType',
            title: userTypes.find(t => t.key === type).value,
            value: type,
            disabled: false,
            selected: true
        })));
        
        return selectedFilters;
        
    }, [selectedCompensationModel, selectedGenres, selectedTypes])

    let currentActiveElement = null;
    switch (currentContent) {
        case 'search':
            currentActiveElement = <SearchInput 
                searchChangeHandler={searchChangeHandler}
                defaultValue={search}/>;
            break;
        case 'compensationModel':
            currentActiveElement = <Options options={preparedCompensationModels} type='compensationModel'/>
            break;
        case 'artistType':
            currentActiveElement = <Options options={preparedArtistTypes} type='artistType'/>
            break;
        case 'genre':
            currentActiveElement = <Options options={preparedGenres} type='genre'/>
            break;
    
        default:
            break;
    }
        
    return (
        <div className='container'>
            <FiltersInput
                currentContent={currentContent}
                filterClickHandler={(filterType) => filterClickHandler(filterType)}/>
            { currentActiveElement }
            <SelectedFilters selectedOptions={preparedSelectedFilters} />
        </div>
    )
}

const Options = ({ isActive, options, type }) => {
    
    return (
        <div className={cn(styles.options)}>
            {
                options.map(option => <Option 
                    key={option.value}
                    option={ option }
                    type={type}
                />)
            }
        </div>
    )
}

const Option = ({ option, type }) => {

    const clickHandler = () => {
        applyFilter({type, value: option.value});
    }
    const classes = [styles.option];

    if (option.disabled) {
        classes.push(styles.option_disabled);
    } else if (option.selected) {
        classes.push(styles.option_enabled)
    }
    return (
        <div className={cn(classes)} onClick={option.disabled ? null : clickHandler}>{ option.title }</div>
    )
}

const SelectedFilters = ({ selectedOptions }) => {
    const selectedOptionsElements = Array.isArray(selectedOptions) 
        ? selectedOptions.map(option => <Option value={option.title} option={option} type={option.type}/>)
        : [];

    return (
        <div className={styles.selected}>
            { selectedOptionsElements.length > 0
                ? <>
                    <div className={styles.selectedLabel}>Selected options: </div>
                    {selectedOptionsElements}
                  </>
                : null
            }
        </div>
    )
}

const FiltersInput = ({ filterClickHandler, currentContent }) => {
    return (
        <div className={styles.searchAndFilters}>
            <div 
                className={cn(styles.searchFilterMobile, currentContent==='search' 
                    ? styles.searchFilterMobile_active : null)}
                onClick={() => filterClickHandler('search')}>
                <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><g clip-path="url(#search_svg__search_svg__clip0)"><path d="M29.039 24.4l-7.857-7.857A11.2 11.2 0 0022.5 11.25c0-2.96-1.14-5.755-3.211-7.87A11.185 11.185 0 0011.25.001C5.047.001 0 5.048 0 11.251S5.047 22.5 11.25 22.5a11.191 11.191 0 005.292-1.318l7.856 7.856a3.26 3.26 0 002.32.962c.878 0 1.702-.342 2.32-.961a3.26 3.26 0 00.962-2.32c0-.877-.341-1.7-.961-2.32zm-17.575-3.777c-.07.002-.143.003-.214.003-5.17 0-9.375-4.206-9.375-9.375 0-5.17 4.206-9.375 9.375-9.375.072 0 .143.001.215.003 5.05.113 9.16 4.317 9.16 9.372s-4.11 9.26-9.16 9.372z"></path></g><defs><clipPath id="search_svg__search_svg__clip0"><path d="M0 0h30v30H0z"></path></clipPath></defs></svg>
            </div>
            <div className={styles.filters}>
                <div 
                    className={cn(styles.filter, currentContent==='compensationModel' 
                        ? styles.filter_active : null)} 
                    onClick={() => filterClickHandler('compensationModel')}>
                    User Type
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10" fill="#212121" width="17" height="10"><path d="M7.65842 9.34194L0.348932 2.03224C-0.11628 1.56725 -0.11628 0.813357 0.348932 0.348597C0.81373 -0.1162 1.56759 -0.1162 2.03235 0.348597L8.50013 6.81655L14.9677 0.348786C15.4327 -0.116011 16.1865 -0.116011 16.6513 0.348786C17.1162 0.813583 17.1162 1.56744 16.6513 2.03242L9.34165 9.34213C9.10914 9.57453 8.80473 9.69059 8.50017 9.69059C8.19546 9.69059 7.89082 9.5743 7.65842 9.34194Z"></path></svg>
                </div>
                <div 
                    className={cn(styles.filter, currentContent==='artistType' 
                        ? styles.filter_active : null)} 
                    onClick={() => filterClickHandler('artistType')}>
                    Artist Type
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10" fill="#212121" width="17" height="10"><path d="M7.65842 9.34194L0.348932 2.03224C-0.11628 1.56725 -0.11628 0.813357 0.348932 0.348597C0.81373 -0.1162 1.56759 -0.1162 2.03235 0.348597L8.50013 6.81655L14.9677 0.348786C15.4327 -0.116011 16.1865 -0.116011 16.6513 0.348786C17.1162 0.813583 17.1162 1.56744 16.6513 2.03242L9.34165 9.34213C9.10914 9.57453 8.80473 9.69059 8.50017 9.69059C8.19546 9.69059 7.89082 9.5743 7.65842 9.34194Z"></path></svg>
                </div>
                <div 
                    className={cn(styles.filter, currentContent==='genre' 
                        ? styles.filter_active : null)} 
                    onClick={() => filterClickHandler('genre')}>
                    All Genres
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10" fill="#212121" width="17" height="10"><path d="M7.65842 9.34194L0.348932 2.03224C-0.11628 1.56725 -0.11628 0.813357 0.348932 0.348597C0.81373 -0.1162 1.56759 -0.1162 2.03235 0.348597L8.50013 6.81655L14.9677 0.348786C15.4327 -0.116011 16.1865 -0.116011 16.6513 0.348786C17.1162 0.813583 17.1162 1.56744 16.6513 2.03242L9.34165 9.34213C9.10914 9.57453 8.80473 9.69059 8.50017 9.69059C8.19546 9.69059 7.89082 9.5743 7.65842 9.34194Z"></path></svg>
                </div>
                <div 
                    className={cn(styles.filter, styles.filter_search, currentContent==='search' 
                        ? styles.filter_active : null)} 
                    onClick={() => filterClickHandler('search')}>
                    Search
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10" fill="#212121" width="17" height="10"><path d="M7.65842 9.34194L0.348932 2.03224C-0.11628 1.56725 -0.11628 0.813357 0.348932 0.348597C0.81373 -0.1162 1.56759 -0.1162 2.03235 0.348597L8.50013 6.81655L14.9677 0.348786C15.4327 -0.116011 16.1865 -0.116011 16.6513 0.348786C17.1162 0.813583 17.1162 1.56744 16.6513 2.03242L9.34165 9.34213C9.10914 9.57453 8.80473 9.69059 8.50017 9.69059C8.19546 9.69059 7.89082 9.5743 7.65842 9.34194Z"></path></svg>
                </div>
            </div>
        </div>
    )
}

const SearchInput = ({ isActive, searchChangeHandler, defaultValue }) => {
    return (
        <div className={cn(styles.search)} onChange={searchChangeHandler}>
            <input 
                type="text" 
                placeholder="Search for collaborators" 
                defaultValue={defaultValue}/>
        </div>
    )
}

export default SearchForCollaboratorsNew;