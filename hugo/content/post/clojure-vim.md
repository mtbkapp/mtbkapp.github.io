+++
date = "2014-09-17T06:18:06-06:00"
title = "(Mac/G)Vim and Clojure"
description = "My *vim setup for working with Clojure"

+++

I've been using Clojure for a little while now (about 2 years). I've used Vim
for longer in the form of GVim on Windows/Linus and MacVim on Mac OS X and of
course vim at the console. For a bit I didn't have a good setup to combine them. 
Then after geting into Clojure a little longer settled on a Vim/Clojure 
setup. I use:

* [Pathogen](https://github.com/tpope/vim-pathogen) for plugin management
* [vim-fireplace](https://github.com/tpope/vim-fireplace) for connecting to a
  nrepl.
* [vim-clojure-static](https://github.com/guns/vim-clojure-static) for syntax
  highlighting, indentation, etc.
* [vim-colors-solarized](https://github.com/altercation/vim-colors-solarized) 
  for awesome easy to read colors in dark and bright situations. Choosing colors
  is hard and Ethen Schoonover, the author of vim-colors-solarized, has 
  done a lot of hard [work](http://ethanschoonover.com/solarized) to make it 
  great. 

Installing these plugins was just as easy as following the instructions in each
project's readme file. Tim Pope's Pathogen really helps with this. I wouldn't 
run Vim with plugins if it didn't exist.  One of the great things about Clojure 
is the possibility of *interactive developement*.  Vim-fireplace brings this 
idea to Vim. It will automatically read the <code>.nrepl-port</code> file and 
connect if that file doesn't exist in the project (because an nrepl hasn't been 
started or if I want to connect to a one off repl) then the 
<code>:Connect</code> command can be used. After that there are 2 commands I 
use the most: the evaluate command <code>cpp</code> and the standard command to
 lookup documentation <code>K</code>. The <code>cpp</code> command just sends 
the form under the cursor to the nrepl server for evaluation and displays the 
results. The <code>K</code> command will simply evaluate <code>(clojure.repl/doc 
symbol-under-cursor)</code>. More usage and more features can be found on the 
individual project pages. Having the ability to evaluate code and get 
documentation right in Vim is great and very productive.

I've done work on Clojure projects that use 
[Ring](https://github.com/ring-clojure/ring) and the 
[lein-ring](https://github.com/weavejester/lein-ring) plugin. 
Lein-ring doesn't start an nrepl by default but it can be configured to do so.
A configuration in a <code>project.clj</code> file like the one below would 
work:

<pre>
:ring {:handler your.handler.ns.here
       :port 8888
       :nrepl {:start? true}}
</pre>


