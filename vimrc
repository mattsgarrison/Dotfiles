" Prevent vim from trying to connect to the X server when connecting
" from home, which causes a startup delay of about 14 seconds. I
" usually connect from home via screen.
"
set clipboard=autoselect,exclude:cons\\\|linux\\\|screen
filetype off
set shortmess+=I
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

" let Vundle manage Vundle 
"  git clone http://github.com/gmarik/vundle.git ~/.vim/bundle/vundle
" required! 
Bundle 'gmarik/vundle'

" --- Vim Feature Additions ---
Bundle 'NERD_tree-Project'
Bundle 'git://github.com/vim-scripts/Color-Sampler-Pack.git'
Bundle 'SuperTab'
Bundle 'rake.vim'
Bundle 'surround.vim'
" surrounds blocks of words with matching apotrophes and quotes
Bundle 'ZoomWin'
" zooms in on a single pane when split already
Bundle 'vim-indent-object'
" Enhances the indention rules of vim
Bundle 'unimpaired.vim'
" Highlights matching brackets and closing tags
Bundle 'The-NERD-tree'
" File Tree
Bundle 'The-NERD-Commenter'
" Block commenting
Bundle 'taglist.vim'
" Git features
Bundle 'fugitive.vim'
" Taglist classviewer
Bundle 'git://github.com/kien/ctrlp.vim'
" Ctrl-P fuzzy searcher.
Bundle 'git://github.com/sjl/gundo.vim.git'
" Visual Undo Tree
Bundle 'git://github.com/mileszs/ack.vim.git'
" Awesome grep replacement
Bundle 'git://github.com/gregsexton/gitv.git'
" Git tree view
Bundle 'git://github.com/tpope/vim-abolish.git'
" Helps reduce spelling problems if tags are built
Bundle 'git://github.com/nelstrom/vim-textobj-rubyblock.git'
" Selects/closes Ruby blocks better
Bundle 'git://github.com/kana/vim-textobj-user.git'
" vim-textobj-rubyblock dependency
Bundle 'git://github.com/Lokaltog/vim-powerline'
" Awesome status bar enhancement
"" --- Syntax Helpers ---
Bundle 'Syntastic'
" Mass syntax highlighting plugin
Bundle 'git://github.com/tpope/vim-markdown.git'
" Highlights Markdown syntax
Bundle 'git://github.com/juvenn/mustache.vim.git'
" Highlights Mustache syntax
Bundle 'git://github.com/vim-ruby/vim-ruby.git'
" Ruby Helper
Bundle 'git://github.com/tpope/vim-rails.git'
" Rails helper
Bundle 'git://github.com/briancollins/vim-jst.git'
" Highlights JST/EJS syntax
Bundle 'git://github.com/pangloss/vim-javascript.git'
" Improved JS syntax indention
Bundle 'git://github.com/nathanaelkane/vim-indent-guides.git'
" Awesome subtle indention guides
" --- Unused but interesting ---
"Bundle 'Lokaltog/vim-easymotion'
"Bundle 'L9'
filetype plugin indent on     " required! 

set nocompatible
set title
set number
set ruler
syntax on
set history=1000
set visualbell
" Set encoding
set encoding=utf-8
" Whitespace stuff
set nowrap
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
set list listchars=tab:\ \ ,trail:·

" Searching
set hlsearch
set incsearch
" Toggle on/off showing whitespace
nmap <silent> <leader>s :silent :nohlsearch<CR>

set ignorecase
set smartcase

" Change the ! to override to a confirm dialog
set confirm
" Tab completion
set wildmode=list:longest,list:full
set wildignore+=*.o,*.obj,.git,*.rbc,*.class,.svn,test/fixtures/*,vendor/gems/*

" Status bar
set laststatus=2

let mapleader = ","
" Without setting this, ZoomWin restores windows in a way that causes
" equalalways behavior to be triggered the next time CommandT is used.
" This is likely a bludgeon to solve some other issue, but it works
set noequalalways

" NERDTree configuration
let NERDTreeIgnore=['\.rbc$', '\~$']
map <Leader>n :NERDTreeToggle<CR>

" Taglist configs
set tags+=./tags
map <leader>t :TlistToggle<CR>
map <C-F12> :!ctags -R --exclude=.git --exclude=logs --exclude=doc .<CR>
au BufRead,BufNewFile *.rb setlocal tags+=~/.vim/tags/ruby_and_gems

" Map F5 to a buffers list
":nnoremap <F5> :buffers<CR>:buffer<Space>
set wildchar=<Tab> wildmenu wildmode=full
set wildcharm=<C-Z>
nnoremap <F10> :b <C-Z>

" Command-T configuration
"let g:CommandTMaxHeight=20
"set wildignore+=*.o,*.obj,.git,*.pyc
"noremap <leader>t :CommandT<cr>
"noremap <leader>y :CommandTFlush<cr>

" bufExplorer configuration
let g:bufExplorerDefaultHelp=0
let g:bufExplorerShowRelativePath=1
map <leader>b :BufExplorer<cr>

map <leader>a :Ack<cr>
let g:ackprg="ack-grep -H --nocolor --nogroup --column"

" ZoomWin configuration
map <Leader><Leader> :ZoomWin<CR>

" CTags
map <Leader>rt :!ctags --extra=+f -R *<CR><CR>
" Make the taglist show up on the right
let Tlist_Use_Right_Window   = 1


" Remember last location in file
if has("autocmd")
  au BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$")
    \| exe "normal g'\"" | endif
endif

function s:setupWrapping()
  set wrap
  set wm=2
  set textwidth=72
endfunction

function s:setupMarkup()
  call s:setupWrapping()
  map <buffer> <Leader>p :Mm <CR>
endfunction

" make uses real tabs
au FileType make                                     set noexpandtab

" Thorfile, Rakefile, Vagrantfile and Gemfile are Ruby
au BufRead,BufNewFile {Gemfile,Rakefile,Vagrantfile,Thorfile,config.ru}    set ft=ruby
autocmd BufNewFile,BufRead *.thor set syntax=ruby

" md, markdown, and mk are markdown and define buffer-local preview
au BufRead,BufNewFile *.{md,markdown,mdown,mkd,mkdn} call s:setupMarkup()

au BufRead,BufNewFile *.txt call s:setupWrapping()

" make python follow PEP8 ( http://www.python.org/dev/peps/pep-0008/ )
au FileType python  set tabstop=4 textwidth=79

" allow backspacing over everything in insert mode
set backspace=indent,eol,start

" load the plugin and indent settings for the detected filetype
filetype plugin indent on

" Opens an edit command with the path of the currently edited file filled in
" Normal mode: <Leader>e
map <Leader>e :e <C-R>=expand("%:p:h") . "/" <CR>

" Opens a tab edit command with the path of the currently edited file filled in
" Normal mode: <Leader>t
map <Leader>te :tabe <C-R>=expand("%:p:h") . "/" <CR>

" Inserts the path of the currently edited file into a command
" Command mode: Ctrl+P
"cmap <C-P> <C-R>=expand("%:p:h") . "/" <CR>

map <silent> <F5> mmgg=G
map <silent> <F5> <Esc> mmgg=G

" Unimpaired configuration
" Bubble single lines
nmap <C-Up> [e
nmap <C-Down> ]e
" Bubble multiple lines
vmap <C-Up> [egv
vmap <C-Down> ]egv

" Map W to w since it's a common typo
command! W :w


" CTRL-Tab is Next window
noremap <C-Tab> <C-W>w
inoremap <C-Tab> <C-O><C-W>w
cnoremap <C-Tab> <C-C><C-W>w
onoremap <C-Tab> <C-C><C-W>w

" Unbind the cursor keys in insert, normal and visual modes.
"for prefix in ['i', 'n', 'v']
"  for key in ['<Up>', '<Down>', '<Left>', '<Right>']
"    exe prefix . "noremap " . key . " <Nop>"
"  endfor
"endfor

" Map ctrl-movement keys to control-w movement
map <c-j> <c-w>j
map <c-k> <c-w>k
map <c-l> <c-w>l
map <c-h> <c-w>h

" Enable syntastic syntax checking
let g:syntastic_enable_signs=1
let g:syntastic_quiet_warnings=1

" gist-vim defaults
if has("mac")
  let g:gist_clip_command = 'pbcopy'
elseif has("unix")
  let g:gist_clip_command = 'xclip -selection clipboard'
endif
let g:gist_detect_filetype = 1
let g:gist_open_browser_after_post = 1

" Use modeline overrides
set modeline
set modelines=10

" Remap backtick to Esc
:imap ` <Esc>
" Map double-tap Esc to clear search highlights
nnoremap <silent> <Esc><Esc> <Esc>:nohlsearch<CR><Esc>
" Set color mode for 256colors
set t_Co=256
" Default color scheme
color jellybeans

" Tag current directory. Ruby specific.
map <Leader>rt :!ctags --extra=+f --exclude=.git --exclude=log -R * `rvm gemdir`/gems/*<CR><CR>

" Define some default colors for the indent guide for terminal based vim
hi IndentGuidesOdd  ctermbg=grey
hi IndentGuidesEven ctermbg=darkgrey

hi IndentGuidesOdd  ctermbg=grey
hi IndentGuidesEven ctermbg=darkgrey

" Let VIM handle multiple buffers nicely
set hidden

" Directories for swp files
set backupdir=~/.vim/backup
set directory=~/.vim/backup

" Turn off jslint errors by default
let g:JSLintHighlightErrorLine = 0

" MacVIM shift+arrow-keys behavior (required in .vimrc)
let macvim_hig_shift_movement = 1

" % to bounce from do to end etc. Required for vim-textob-rubyblock
runtime! macros/matchit.vim

" enable vim-ruby
set nocompatible      " We're running Vim, not Vi!
syntax on             " Enable syntax highlighting
filetype on           " Enable filetype detection
filetype indent on    " Enable filetype-specific indenting
filetype plugin on    " Enable filetype-specific plugins


" Include user's local vim config
if filereadable(expand("~/.vimrc.local"))
  source ~/.vimrc.local
endif
if has("gui_running")
    set guioptions=egmrt
endif
if has("autocmd")
  au InsertEnter * silent execute "!gconftool-2 --type string --set /apps/gnome-terminal/profiles/Default/cursor_shape ibeam"
  au InsertLeave * silent execute "!gconftool-2 --type string --set /apps/gnome-terminal/profiles/Default/cursor_shape block"
  au VimLeave    * silent execute "!gconftool-2 --type string --set /apps/gnome-terminal/profiles/Default/cursor_shape ibeam"
endif
