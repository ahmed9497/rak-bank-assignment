import { createContext, useEffect, useState } from 'react';
import { Inputs } from '../components/carousel';
import { toast } from 'react-toastify';


export interface SlidesProps {
    id: string,
    title: string
}
export interface AppContextType {

    slides: SlidesProps[],
    formSubmit: (data: Inputs[]) => void;
}
export interface Props {
    children: React.ReactNode
}
export const AppContext = createContext<AppContextType>({
    slides: [],
    formSubmit: () => { },
});

export const AppProvider = ({ children }: Props) => {

    const [slides, setSlides] = useState<SlidesProps[]>([]);

    useEffect(() => {
        fetch("/api/slides")
            .then((response) => response.json())
            .then((json) => {
                setSlides(json)
            })

    }, [])

    const formSubmit = (data: Inputs[]) => {
        console.log(data);
        fetch('/submitPollForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                toast.success('Successfully Submit ');
               
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return (
        <AppContext.Provider value={{ slides, formSubmit }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;