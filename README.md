## React GitHub Issue Finder

### Application & Folder Structures

Experimental folder structure, organised for micro-applications while maintaining UI consistency.

There are 4 main folders:
```
/Apps
Each micro-application lives here. It can have different architecture.
Eg: IssueFinder implements "Observer / Listener" design with Redux & Saga

Other micro-app might decide to not use Redux. Thanks to code-splitting, micro-app specific scripts will be lazy loaded.

For sharing state among micro-app, one possible way to expore is via micro-app specific Context.

/Services
House services that are usable across all domains.

/UI
All presentational components live here.
- Should be dumb components.
- Free from any implementation details.
- Micro-app will reuse and compose these components into its UI components.  

/Utils
All other utilities for usage across all domains that don't belong in Services and UI.
```
