set nocompatible               " Be iMproved

if has('vim_starting')
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

call neobundle#rc(expand('~/.vim/bundle/'))


filetype off
set shortmess+=I

" Recommended to install
" After install, turn shell ~/.vim/bundle/vimproc, (n,g)make -f your_machines_makefile
NeoBundle 'Shougo/vimproc', {
      \ 'build' : {
      \     'windows' : 'make -f make_mingw32.mak',
      \     'cygwin' : 'make -f make_cygwin.mak',
      \     'mac' : 'make -f make_mac.mak',
      \     'unix' : 'make -f make_unix.mak',
      \    },
      \ }
NeoBundle 'Shougo/unite.vim'
NeoBundle 'sudo.vim'
NeoBundle 'git://github.com/vim-scripts/Colour-Sampler-Pack.git'
NeoBundle 'gmarik/sudo-gui.vim'
NeoBundle 'SuperTab'
NeoBundle 'rake.vim'
NeoBundle 'surround.vim'
NeoBundle 'ZoomWin'
NeoBundle 'vim-indent-object'
NeoBundle 'unimpaired.vim'
NeoBundle 'NERD_tree-Project'
NeoBundle 'The-NERD-tree'
NeoBundle 'The-NERD-Commenter'
NeoBundle 'taglist.vim'
NeoBundle 'ag.vim'
" NeoBundle 'git://github.com/sjl/gundo.vim.git'
NeoBundle 'git@github.com:majutsushi/tagbar.git'
NeoBundle 'git://github.com/tpope/vim-abolish.git'
NeoBundle 'git://github.com/airblade/vim-gitgutter.git'
NeoBundle 'git://github.com/nelstrom/vim-textobj-rubyblock.git'
NeoBundle 'git://github.com/kana/vim-textobj-user.git'
NeoBundle 'git@github.com:Townk/vim-autoclose.git'
NeoBundle 'Lokaltog/vim-easymotion'

NeoBundle 'bling/vim-airline'
NeoBundle 'bling/vim-bufferline'

" Syntax Helpers
NeoBundle 'Syntastic'
NeoBundle 'git://github.com/tpope/vim-markdown.git'
NeoBundle 'git://github.com/vim-ruby/vim-ruby.git'
NeoBundle 'git://github.com/tpope/vim-rails.git'
NeoBundle 'git://github.com/briancollins/vim-jst.git'
NeoBundle 'git://github.com/pangloss/vim-javascript.git'
NeoBundle 'git://github.com/nathanaelkane/vim-indent-guides.git'
"NeoBundle 'Valloric/YouCompleteMe' 

" Installation check.
NeoBundleCheck

filetype plugin indent on     " detect file types

set title
set number
set ruler                     " Show the ruler
set rulerformat=%30(%=\:b%n%y%m%r%w\ %l,%c%V\ %P%) " A ruler on steroids
"set showcmd                   " Show partial commands in the statusline
"set spell spelllang=en_us
syntax on                     " Turn on syntax highlighting
set history=1000              " Store more history
set visualbell                " Flash the terminal for notifications
" Set encoding
set encoding=utf-8
" Whitespace stuff
set nowrap
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab                 " Tabs are evil
set list listchars=tab:\ \ ,trail:·
set scrolljump=5              " Scroll 5 lines when bottom of page is reached
set scrolloff=3               " Minimum lines around the cursor


" Searching
set hlsearch                  " highlight search
set incsearch                 " search as you type
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
map <leader>tl :TlistToggle<CR>
au BufRead,BufNewFile *.rb setlocal tags+=~/.vim/tags/ruby_and_gems

" Map F5 to a buffers list
":nnoremap <F5> :buffers<CR>:buffer<Space>
set wildchar=<Tab> wildmenu wildmode=full
set wildcharm=<C-Z>
nnoremap <F10> :b <C-Z>

" bufExplorer configuration
let g:bufExplorerDefaultHelp=0
let g:bufExplorerShowRelativePath=1
map <leader>b :BufExplorer<cr>


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

" Unite.vim awesomeness
"nnoremap <space>/ :Unite grep:.<CR>
"nnoremap <C-p> :Unite file_rec/async<CR>

" bufferline config
let g:bufferline_echo=0
set statusline=%{bufferline#generate_string()}

" Unite
let g:unite_source_history_yank_enable = 1
call unite#filters#matcher_default#use(['matcher_fuzzy'])
nnoremap <leader>t :<C-u>Unite -no-split -buffer-name=files   -start-insert file_rec/async:!<cr>
nnoremap <leader>f :<C-u>Unite -no-split -buffer-name=files   file<cr>
nnoremap <leader>r :<C-u>Unite -no-split -buffer-name=mru     -start-insert file_mru<cr>
nnoremap <leader>o :<C-u>Unite -no-split -buffer-name=outline -start-insert outline<cr>
nnoremap <leader>y :<C-u>Unite -no-split -buffer-name=yank    history/yank<cr>
nnoremap <leader>e :<C-u>Unite -no-split -buffer-name=buffer  buffer<cr>

" Custom mappings for the unite buffer
autocmd FileType unite call s:unite_settings()
function! s:unite_settings()
  " Play nice with supertab
  let b:SuperTabDisabled=1
  " Enable navigation with control-j and control-k in insert mode
  imap <buffer> <C-j>   <Plug>(unite_select_next_line)
  imap <buffer> <C-k>   <Plug>(unite_select_previous_line)
endfunction


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
":imap ` <Esc>
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

" Let VIM handle multiple buffers without saving first
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
" Ctags {
  set tags=./tags;/,~/.vimtags
" }

" AutoCloseTag {
" Make it so AutoCloseTag works for xml and xhtml files as well
  au FileType xhtml,xml ru ftplugin/html/autoclosetag.vim
  nmap <Leader>ac <Plug>ToggleAutoCloseMappings
" }

" Set up some gui mvim/gvim configs
if has("gui_running")
    set guioptions=egmrt
endif


" Include user's local vim config
if filereadable(expand("~/.vimrc.local"))
  source ~/.vimrc.local
endif
