  (defvar current-user
  (getenv
  (if (equal system-type 'windows-nt) "USERNAME" "USER")))

  (message "Prelude is powering up... Be patient, Master %s!" current-user)

  (when (version< emacs-version "24.1")
  (error "Prelude requires at least GNU Emacs 24.1"))

  (defvar prelude-dir (file-name-directory load-file-name)
  "The root dir of the Emacs Prelude distribution.")
  (defvar prelude-core-dir (expand-file-name "core" prelude-dir)
  "The home of Prelude's core functionality.")
  (defvar prelude-modules-dir (expand-file-name  "modules" prelude-dir)
  "This directory houses all of the built-in Prelude modules.")
  (defvar prelude-personal-dir (expand-file-name "personal" prelude-dir)
  "This directory is for your personal configuration.

  Users of Emacs Prelude are encouraged to keep their personal configuration
  changes in this directory.  All Emacs Lisp files there are loaded automatically
  by Prelude.")
  (defvar prelude-personal-preload-dir (expand-file-name "preload" prelude-personal-dir)
  "This directory is for your personal configuration, that you want loaded before Prelude.")
  (defvar prelude-vendor-dir (expand-file-name "vendor" prelude-dir)
  "This directory houses packages that are not yet available in ELPA (or MELPA).")
  (defvar prelude-savefile-dir (expand-file-name "savefile" prelude-dir)
  "This folder stores all the automatically generated save/history-files.")
  (defvar prelude-modules-file (expand-file-name "prelude-modules.el" prelude-dir)
  "This files contains a list of modules that will be loaded by Prelude.")

  (unless (file-exists-p prelude-savefile-dir)
  (make-directory prelude-savefile-dir))

  (defun prelude-add-subfolders-to-load-path (parent-dir)
  "Add all level PARENT-DIR subdirs to the `load-path'."
  (dolist (f (directory-files parent-dir))
  (let ((name (expand-file-name f parent-dir)))
  (when (and (file-directory-p name)
  (not (equal f ".."))
  (not (equal f ".")))
  (add-to-list 'load-path name)
  (prelude-add-subfolders-to-load-path name)))))

  ;; add Prelude's directories to Emacs's `load-path'
  (add-to-list 'load-path prelude-core-dir)
  (add-to-list 'load-path prelude-modules-dir)
  (add-to-list 'load-path prelude-vendor-dir)
  (prelude-add-subfolders-to-load-path prelude-vendor-dir)

  ;; reduce the frequency of garbage collection by making it happen on
  ;; each 50MB of allocated data (the default is on every 0.76MB)
  (setq gc-cons-threshold 50000000)

  ;; preload the personal settings from `prelude-personal-preload-dir'
  (when (file-exists-p prelude-personal-preload-dir)
  (message "Loading personal configuration files in %s..." prelude-personal-preload-dir)
  (mapc 'load (directory-files prelude-personal-preload-dir 't "^[^#].*el$")))

  (message "Loading Prelude's core...")

  ;; the core stuff
  (require 'prelude-packages)
  (require 'prelude-ui)
  (require 'prelude-core)
  (require 'prelude-mode)
  (require 'prelude-editor)
  (require 'prelude-global-keybindings)

  ;; OSX specific settings
  (when (eq system-type 'darwin)
  (require 'prelude-osx))

  (message "Loading Prelude's modules...")

  ;; the modules
  (when (file-exists-p prelude-modules-file)
  (load prelude-modules-file))

  ;; config changes made through the customize UI will be store here
  (setq custom-file (expand-file-name "custom.el" prelude-personal-dir))

  ;; load the personal settings (this includes `custom-file')
  (when (file-exists-p prelude-personal-dir)
  (message "Loading personal configuration files in %s..." prelude-personal-dir)
  (mapc 'load (directory-files prelude-personal-dir 't "^[^#].*el$")))

  (message "Prelude is ready to do thy bidding, Master %s!" current-user)

  (prelude-eval-after-init
  ;; greet the use with some useful tip
  (run-at-time 5 nil 'prelude-tip-of-the-day))
  ;;(left-fringe . 1)

  ;; scroll one line at a time (less "jumpy" than defaults)
  (setq mouse-wheel-scroll-amount '(1 ((shift) . 1))) ;; one line at a time

  (setq mouse-wheel-progressive-speed nil) ;; don't accelerate scrolling

  (setq mouse-wheel-follow-mouse 't) ;; scroll window under mouse

  (setq scroll-step 1) ;; keyboard scroll one line at a time
  ;; Run Powerline at startup
  (add-to-list 'load-path "")
  (require 'powerline)
  (setq powerline-arrow-shape 'arrow)   ;; the default
  (setq powerline-arrow-shape 'curve)   ;; give your mode-line curves
  (setq powerline-arrow-shape 'arrow14) ;; best for small fonts
  (custom-set-faces
   '(mode-line ((t (:foreground "#030303" :background "#bdbdbd" :box nil))))
   '(mode-line-inactive ((t (:foreground "#f9f9f9" :background "#666666" :box nil)))))
  (setq powerline-color1 "grey22")
  (setq powerline-color2 "grey40")

  ;; Make Speedbar open in the same frame
  (require 'sr-speedbar)
  ;;(speedbar 1)
  (setq speedbar-use-images nil)

  ;; disable the toolbar
  (tool-bar-mode -1)
  ;; Add movement keybindings
  (global-set-key [M-left] 'windmove-left)          ; move to left windnow
  (global-set-key [M-right] 'windmove-right)        ; move to right window
  (global-set-key [M-up] 'windmove-up)              ; move to upper window
  (global-set-key [M-down] 'windmove-down)          ; move to lower window

  ;; Change backup behavior
  (setq
     backup-by-copying t      ; don't clobber symlinks
     backup-directory-alist
      '(("." . "~/.emacs-saves"))    ; don't litter my fs tree
     delete-old-versions t
     kept-new-versions 6
     kept-old-versions 2
     version-control t)       ; use versioned backups

