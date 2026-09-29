import { motion, AnimatePresence } from "framer-motion";

type WelcomeScreenProps = {
    visible: boolean;
    onDismiss: () => void;
};

export default function WelcomeScreen({ visible, onDismiss }: WelcomeScreenProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-50 bg-black flex items-center justify-center px-6"
                >
                    <div className="max-w-lg text-center font-mono">
                        <p className="text-xs tracking-[0.4em] text-amber-500/70 mb-6">
                            WELCOME TO NIGHT RADIO
                        </p>

                        <p className="text-amber-100/90 text-lg leading-relaxed mb-6">
                            It's late. The signal is clear. You're listening to Vishnu Priya's frequency.
                        </p>

                        <p className="text-amber-100/60 text-sm mb-6">
                            Tonight's broadcast has a few stops:
                        </p>

                        <div className="text-left inline-block space-y-3 mb-6 text-amber-100/80 text-sm">
                            <p>
                                <span className="text-amber-300">91.5 — ABOUT</span>
                                <br />
                                Get to know who's behind the signal.
                            </p>
                            <p>
                                <span className="text-amber-300">96.3 — WORK</span>
                                <br />
                                Projects, experiments, and things built from scratch.
                            </p>
                            <p>
                                <span className="text-amber-300">104.7 — CONTACT</span>
                                <br />
                                The line is open.
                            </p>
                        </div>

                        <p className="text-amber-100/60 text-sm leading-relaxed mb-6 italic">
                            Somewhere between them, there's another frequency.
                            <br />
                            99.9 — ???
                            <br />
                            No station name. No program schedule. Just a signal.
                            <br />
                            Maybe you'll find it.
                        </p>

                        <p className="text-amber-100/70 text-sm mb-8">
                            Tune in. Explore around. Stay awhile.
                        </p>

                        <button
                            onClick={onDismiss}
                            className="border border-amber-400/50 text-amber-300 px-6 py-2 rounded-md tracking-widest text-sm hover:bg-amber-400/10 transition-colors"
                        >
                            TUNE IN 📻
                        </button>
                        <p className="text-amber-500/50 text-xs font-mono tracking-widest mt-8">
                            ● SIGNAL FOUND — 4 STATIONS AVAILABLE
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}