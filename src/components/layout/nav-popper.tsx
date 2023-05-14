import { createSignal } from 'solid-js';
import type { JSX, Component } from 'solid-js';
import { Dialog, DialogPanel, Transition, TransitionChild, DialogOverlay } from 'solid-headless';
import { DismissIcon } from '../icon/dismiss';

type Props = {
	icon: astroHTML.JSX.Element;
	children: JSX.Element;
};

export const NavPopper: Component<Props> = (props: Props) => {
	const [isOpen, setIsOpen] = createSignal(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring ring-gray-200 rounded outline-none transition-colors align-middle"
			>
				{props.icon}
			</button>

			<Transition show={isOpen()}>
				<Dialog isOpen class="fixed z-10" onClose={closeModal}>
					<TransitionChild
						enter="ease-in duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<DialogOverlay class="fixed inset-0 bg-gray-700/70" />
					</TransitionChild>
					<TransitionChild
						enter="ease-in duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-out duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<DialogPanel class="fixed top-4 right-4 w-36 p-4 pr-12 overflow-hidden bg-white shadow-xl rounded-xl">
							<button
								class="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring ring-gray-200 rounded transition-colors outline-none"
								onClick={closeModal}
							>
								<DismissIcon />
							</button>
							{props.children}
						</DialogPanel>
					</TransitionChild>
				</Dialog>
			</Transition>
		</>
	);
};
