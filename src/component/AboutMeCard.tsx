import { FaGithub, FaLinkedin, FaYoutube} from 'react-icons/fa'

export const AboutMeCard = () => {
    return (
                      <div className="flex flex-col items-center text-center gap-4">
             
                <img
                  src="/img/philips.png"
                  alt="Philips Ola"
                  className="w-40 h-40 rounded-full object-cover border-2 border-white shadow-sm"
                />

                <div>
                  <h3 className="text-[1.5rem] font-semibold">Philips Ola</h3>
                  <p className="text- font-semibold uppercase tracking-widest text-slate-500 mt-1">
                   Dev. & Tutor
                  </p>
                  <p className="mt-3 text- leading-snug text-slate-500">
                    Software engineer and digital content creator/tutor building tools for founders.
                  </p>
                </div>

                {/* SOCIAL HANDLES*/}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3 w-full">
                  <a
                    href="https://linkedin.com/in/olaphilips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#0A66C2] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>

                  <a
                    href="https://youtube.com/idtechnol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>

                  <a
                    href="https://github.com/philips-ola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>

                <span className="text- text-slate-400">Full Stack Dev</span>
              </div>
    )
}