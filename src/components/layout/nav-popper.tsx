import type { JSX, Component } from 'solid-js';
import { createSignal } from 'solid-js';
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
				class="rounded p-2 align-middle text-gray-500 outline-none ring-gray-200 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring"
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
						<DialogPanel class="fixed right-4 top-4 w-36 overflow-hidden rounded-xl bg-white p-4 pr-12 shadow-xl">
							<button
								class="absolute right-2 top-2 rounded p-1 text-gray-500 outline-none ring-gray-200 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring"
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
