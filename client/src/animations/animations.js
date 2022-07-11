export const ScaleAndOpacity = {
    initial: {
        opacity: 0,
        scale: 0.75
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.4
        }
    },
}
export const ScaleAndOpacity2 = {
    initial: {
        opacity: 0,
        scale: 0.75
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.1
        }
    },
}
export const UpAndOpacity = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    },
}
export const UpAndOpacity2 = {
    initial: {
        y: -30,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: -10,
        opacity: 1
    },
}
export const Opacity = {
    initial: {
        opacity: 0,
        transition: {
            default: {
                duration: 0.2
            }
        }
    },
    animate: {
        opacity: 1,
        transition: {
            default: {
                duration: 0.2
            }
        }
    }
}
export const LoadingScreenCurtain = {
    initial: {
        x: 0,
    },
    animate: {
        x: '675px',
        transition: {
            duration: 1
        }
    },
}
export const LoadingScreenContent = {
    initial: {
        x: '300px',
    },
    animate: {
        x: 0,
        transition: {
            duration: 1.2
        }
    },
}
export const MenuSlide = {
    initial: {
        right: "-400px",
        transition: {
            default: {
                duration: 0.25
            }
        }
    },
    animate: {
        right: 0,
        transition: {
            default: {
                duration: 0.25
            }
        }
    },
}