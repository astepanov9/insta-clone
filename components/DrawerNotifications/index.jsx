import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { faker } from '@faker-js/faker';

import { closeDrawer } from '../../redux/slice/drawerSlice'
import Subscriber from '../Subscriber';

const DrawerNotifications = () => {
    const [subscribers, setSubscribers] = React.useState([]);
    const open = useSelector((store) => store.drawerSlice.isOpen);
    const dispatch = useDispatch();

    const onClickDrawerClose = () => {
        dispatch(closeDrawer(false));
    }

    React.useEffect(() => {
        setSubscribers(
            [...Array(6)].map((profile) => ({
                userId: faker.datatype.uuid(),
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),
            }))
        );
    }, []);

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClickDrawerClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                            <Transition.Child
                                as={React.Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <div className="flex h-full flex-col bg-white py-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] rounded-r-lg">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-xl font-bold text-gray-900">Notifications</Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0">
                                                <div className="h-full" aria-hidden="true">
                                                    {
                                                        subscribers.map(profile => (
                                                            <Subscriber key={profile.userId} username={profile.username} avatar={profile.avatar} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DrawerNotifications