import { createSignal, type JSX } from 'solid-js';
import { Dialog, DialogPanel, Transition, TransitionChild, DialogOverlay } from 'solid-headless';

export default function NavPopper(props: any): JSX.Element {
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
				class="p-1 md:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring ring-gray-200 rounded outline-none transition-colors align-middle"
			>
				{props.icon}
			</button>

			<Transition appear show={isOpen()}>
				<Dialog isOpen class="fixed z-10" onClose={closeModal}>
					<div class="min-h-screen">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<DialogOverlay class="fixed inset-0 bg-gray-700 bg-opacity-70 backdrop-blur-md" />
						</TransitionChild>
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<DialogPanel class="fixed top-4 right-4 w-36 p-4 pr-12 overflow-hidden bg-white shadow-xl rounded-xl">
								<button
									class="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring ring-gray-200 rounded transition-colors outline-none"
									onClick={closeModal}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="m4.21 4.387l.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12L4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094l-.083.094Z"
										></path>
									</svg>
								</button>
								{props.content}
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
