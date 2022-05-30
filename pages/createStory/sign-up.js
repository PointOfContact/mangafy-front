import React, { useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import PrimaryButton from 'components/ui-elements/button'
import styles from './styles.module.scss'

const SignUp = () => {
  return (
    <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Sign up for FREE</div>
                <div className={styles.signUpForm}>
                    <input type='text' className={cn(styles.input)} placeholder='Your dream name'></input>
                    <input type='text' className={cn(styles.input)} placeholder='Your email'></input>
                    <input type='text' className={cn(styles.input)} placeholder='Password'></input>
                </div>
                <div className={styles.buttons}>
                    <PrimaryButton
                        text="Create account"
                    />
                </div>
                <div className={styles.signUpWith}>
                    <div className={styles.signUpWith__label}>
                        Or sign up with:
                    </div>
                    <div className={styles.signUpWith__buttons}>
                        <button className={cn(styles.signUpButton, styles.signUpButton_google)}>
                            Sign up with Google</button>
                        <button className={cn(styles.signUpButton, styles.signUpButton_facebook)}>Sign up with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SignUp