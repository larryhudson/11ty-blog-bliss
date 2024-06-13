---
title: A Neovim shortcut for quickly extracting Twig components
description: Writing a custom Lua shortcut that saves code to a separate file, and replaces the code with an 'include' statement
customPermalink: /neovim-twig-component-extract/
openGraphImage: /images/neovim-twig-extract.png
date: 2024-06-13
tags:
  - programming
  - neovim
  - twig
---

In the last week or so I’ve been getting up to speed learning how to make websites with [Craft CMS](https://craftcms.com/). Craft is a PHP-based content management system that uses [Twig](https://twig.symfony.com/) templates.

In Twig, you can include smaller templates inside your template by doing something like this:
```twig
{% verbatim %}{{ include('partials/Header') }}{% endverbatim %}
```

I’m using [Neovim](https://neovim.io/) as my code editor - I’ve been using it for the past 6-12 months. Neovim is based on the original [Vim](https://www.vim.org/) editor that has been around since the early nineties, but is extremely customisable thanks to its [Lua](https://lua.org/) scripting engine. Lua is a flexible and lightweight programming language that is relatively straightforward to learn.

Building a basic homepage template in Twig, I found myself writing a lot of ‘include’ statements and separating components into separate Twig files. I was keen to make this more efficient if possible.

## What you can do with Lua scripting in Neovim

Within your Neovim configuration file, it’s possible to assign keyboard shortcuts (or ‘keymaps’) to execute certain functions. These may be ‘built in’ functions, or custom functions you write yourself.

Within a custom function, you can automate key presses (so one ‘key map’ can execute a series of key presses), but you can also do more complicated things with files in the current project folder.

## Extracting components in Twig files

I thought it would be interesting to create a custom shortcut where:
  - I could select some code, hit the space bar and then hit 'et' (standing
  for '[e]xtract [t]emplate').
  - The editor would then ask me to type the name of the component that I want to save.
  - It would save a new Twig file with the selected code in it, at `templates/partials/<Component name>.twig`
  - It would replace the current selected text with an include statement like this:
  ```twig
  {% verbatim %}{{ include('partials/<Component name>') }}{% endverbatim %}
  ```

With a little help from ChatGPT, I was able to get this working fairly quickly!

Here’s the basic Lua code to get this working:
```lua
function ExtractTwigTemplate()
  -- Do not run if this is not a Twig file
  if vim.bo.filetype ~= 'twig' then
    print 'This is not a Twig file'
    return
  end

  -- Ask the user for the template filename
  local filename = vim.fn.input 'Enter new template filename: '
  if filename == '' then
    print 'Filename cannot be empty!'
    return nil
  end

  -- Get the selected lines
  local start_line = vim.fn.line "'<"
  local end_line = vim.fn.line "'>"
  local component_lines = vim.fn.getline(start_line, end_line)

  -- If only one line is selected, convert it to a table (like an array in Lua)
  if type(component_lines) == 'string' then
    component_lines = { component_lines }
  end

  -- Write the lines to the new template file
  local component_filepath = string.format('templates/partials/%s.twig', filename)
  vim.fn.writefile(component_lines, component_filepath)

  -- Delete the selected lines
  vim.cmd "'<,'>d"

  {%- verbatim %}
  local include_line = string.format("{{ include('partials/%s') }}", filename)
  {% endverbatim %}
  -- Insert the include line
  vim.fn.append(start_line - 1, include_line)
end

-- Set the key map so that the function runs when the user presses <Leader>et in visual mode
vim.api.nvim_set_keymap('x', '<Leader>et', ':lua ExtractTwigTemplate()<CR>', { noremap = true, silent = true })
```

To get this working, I added this code to the end of my `init.lua` file in my
Neovim configuration folder. You can [read more about configuring Neovim using
Lua here](https://neovim.io/doc/user/lua-guide.html).

So once this was added to my config file, I could select some code in a Twig
file, hit space then 'et', and it would ask me for the component name. When I
enter the component name and hit enter, it saves the selected code into a new
file and replaces it in the current file with the 'include' statement. Handy!

Here's a GIF showing how the keyboard shortcut works in practice:

![A screen recording GIF of Larry selecting some code, hitting space then 'et',
naming the component 'Card', and the keyboard shortcut running.](/images/neovim-twig/extract-component-without-props.gif)

(Side note: I used [Keycastr](https://github.com/keycastr/keycastr) to show the key strokes in the bottom corner of the
screen, macOS' native Screenshot tool to record the video, and [Gifski](https://apps.apple.com/us/app/gifski/id1351639930?mt=12) to turn the video into a GIF.)

## Taking it further with component props

Often when you’re creating components, you want to pass in variables to be included in the component. In Twig, you can do that like this, by passing in an object as the second parameter:
```twig
{% verbatim %}{{ include('partials/Card', {
  title: 'Title',
  description: 'description'
 } }}{% endverbatim %}
```

I wanted to extend my shortcut so that it would ask for a list of ‘props’ that would then be included in the component.

This meant adding another question that the editor would ask after receiving the component name.

The shortcut would need to, for each prop:
- add a line to the 'include' statement setting the prop (eg. `title: '',`)
- add a line to the top of the component file itself, to show that the prop is
avaiable within the component (eg. `{% verbatim %}{% set title = title|default('') %}{% endverbatim %}`

the ‘object’ lines that are inserted into the ‘include’ statement (eg. , but I also wanted to include the props at the top of the component file itself, to show what props are available to the component:

So if I create a component called 'Card' with the props 'title' and
'description', the output should be:

```twig
{%- verbatim %}
{# where my selected code was #}
  {{ include('partials/Card', {
    title: '',
    heading: '',
  }) }}

{# inside templates/partials/Card.php #}
  {% set title = title|default('') %}
  {% set description = description|default('') %}
  
  {# Original selected code goes here #}
{% endverbatim %}
```

This was a little bit more fiddly, because it required writing new lines of text and manipulating the Lua table of strings before writing the component file. But I’m happy with where this ended up. Here's the updated code:

```lua
function ExtractTwigTemplateWithProps()
  if vim.bo.filetype ~= 'twig' then
    print 'This is not a Twig file'
    return
  end

  -- Ask the user for the template filename
  local filename = vim.fn.input 'Enter new template filename: '
  if filename == '' then
    print 'Filename cannot be empty!'
    return nil
  end

  -- Define include_lines as a table so we can add props to it if we need
  {%- verbatim %}
  local include_lines = { string.format("{{ include('partials/%s' }}", filename) }
  {% endverbatim %}

  -- Get the selected lines
  local start_line = vim.fn.line "'<"
  local end_line = vim.fn.line "'>"
  local component_lines = vim.fn.getline(start_line, end_line)

  -- If only one line is selected, convert it to a table (like an array in Lua)
  if type(component_lines) == 'string' then
    component_lines = { component_lines }
  end

  -- Ask the user for a list of props
  local props_string = vim.fn.input 'Enter a list of properties, separated by commas, or leave blank to skip: '

  if props_string ~= '' then
    -- Redefine include_lines, to open the props object
    {% verbatim %}include_lines = { string.format("{{ include('partials/%s', {", filename) }{% endverbatim %}

    local props = vim.fn.split(props_string, ',')

    -- For each prop, write {% set prop = prop|default('') %} at the top of the component_lines
    for _, prop in ipairs(props) do
      -- Trim whitespace around prop
      local trimmed_prop = vim.fn.trim(prop)
      {%- verbatim %}
      table.insert(component_lines, 1, string.format("{%% set %s = %s|default('') %%}", trimmed_prop, trimmed_prop))
      {% endverbatim %}
      table.insert(include_lines, string.format("  %s: '',", trimmed_prop))
    end

    -- Close the props object at the end of the 'include' statement
    table.insert(include_lines, '}) }}')
  end

  -- Write the lines to the new template file
  local component_filepath = string.format('templates/partials/%s.twig', filename)
  vim.fn.writefile(component_lines, component_filepath)

  -- Delete the selected lines
  vim.cmd "'<,'>d"

  -- Insert the include lines
  vim.fn.append(start_line - 1, include_lines)
end

-- Set the key map so that the function runs when the user presses <Leader>et in visual mode
vim.api.nvim_set_keymap('x', '<Leader>et', ':lua ExtractTwigTemplateWithProps()<CR>', { noremap = true, silent = true })
```

Here's another GIF showing how the updated shortcut runs:

![A screen recording GIF of Larry selecting some code, hitting space then 'et',
naming the component 'Card', entering the props 'image' and 'body', and the keyboard shortcut running.](/images/neovim-twig/extract-component-with-props.gif)

## What else is possible?

I should point out that I am very new to creating my own shortcuts using Lua in Neovim, so I might not be doing things in the ideal way.

If you’ve made some of these shortcuts yourself, I would love to hear about them. Feel free to reach out.

If you think this sounds interesting but you don’t use Neovim, I would recommend giving it a shot! There is a learning curve when you start using a Vim-based editor, but once you get into the rhythm, you can navigate around code and get things done more efficiently. 
