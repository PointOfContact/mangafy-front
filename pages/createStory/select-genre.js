import React, { useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import PrimaryButton from 'components/ui-elements/button'
import styles from './styles.module.scss'
import { options } from 'helpers/constant'

if (!options) options = [{key: 0, value: 'Can not get genres types'}];
else {
    options.forEach((option, i) => {
        option.key = i;
    })
}

const selectGenre = () => {

    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Genre</div>
                <div className={cn(styles.descr)}>The genre you choose is an important part, so tell your readers what you want to create. Choose up to  2 main genres</div>
                <MultiSelect className={styles.multiselect} options={options} onChange={(selected) => console.log(selected)} />
                <div className={styles.buttons}>
                    <PrimaryButton
                        text="Let’s go"
                        splitterStyle={{
                            width: '143px',
                            height: '54px',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const MultiSelect = ({ options, onChange = ()=>{}, className='' }) => {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [areOptionsVisible, setAreOptionsVisible] = useState(false);
    const [preparedOptions, setPreparedOptions] = useState(
        options
    );
    const [activeOption, setActiveOption] = useState(0);

    const inputRef = useRef(null);

    useEffect(() => {
        onChange(selectedOptions);
        prepareOptions();
    }, [selectedOptions]);

    const inputChangeHandler = () => {
        prepareOptions();
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') addOption(preparedOptions[activeOption]);
        if (e.key === 'Backspace') removeOption(selectedOptions[selectedOptions.length-1]?.key);
        if (e.key === 'ArrowDown') moveCursorDown();
        if (e.key === 'ArrowUp') moveCursorUp();
    }
    const moveCursorDown = () => {
        setActiveOption(ao => {
            const newActiveOption = ao+1;
            if ( newActiveOption > preparedOptions.length-1 ) return ao;
            return newActiveOption;
        });
    }
    const moveCursorUp = () => {
        setActiveOption(ao => {
            const newActiveOption = ao-1;
            if ( newActiveOption < 0 ) return ao;
            return newActiveOption;
        });
    }

    const focusHandler = () => {
        setTimeout(() => {
            setAreOptionsVisible(true);
        }, 300);
    }
    const blurHandler = () => {
        setTimeout(() => {
            setAreOptionsVisible(false);
        }, 300);
    }

    const prepareOptions = () => {
        if (!inputRef) return;
        const value = inputRef.current.value || '';
        setActiveOption(0);
        setPreparedOptions(state => {
            const filtered = options.filter(option => {
                const contains = option.value.toLowerCase().indexOf(value.toLowerCase())>(-1);
                const isSelected = selectedOptions.includes(option);
                return (contains && !isSelected)
            })
            return filtered;
        })
    }
    const addOption = option => {
        if (!option) return;
        setSelectedOptions(state => {
            const newState = [...state, option];
            inputRef.current.value = '';
            return newState;
        });
    } 
    const removeOption = optionKey => {
        if (optionKey === undefined || optionKey === null) return;
        setSelectedOptions(state => {
            const newState = state.filter(o => o.key !== optionKey)
            return newState;
        });
    }

    return(
        <div className={cn(styles.multiSelect, className)}>
            {
                selectedOptions.map(o => (
                    <span 
                        onClick={() => removeOption(o.key)}
                        key={o.key} 
                        className={styles.multiSelect__selected}
                    >{o.value}</span>
                ))
            }
            <input
                onKeyDown={keyDownHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
                onChange={inputChangeHandler} 
                ref={inputRef} 
                type="text" 
                className={styles.multiSelect__input}
            />
            <div className={cn(
                styles.multiSelect__options,
                !areOptionsVisible ? styles.multiSelect__options_hidden : null)}>
                {
                    preparedOptions.map((o, i) => (
                        <div
                            onClick={() => addOption(o)} 
                            key={o.key} 
                            className={cn(
                                styles.multiSelect__option,
                                activeOption === i ? styles.multiSelect__option_active : null
                            )}
                        >{o.value}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default selectGenre