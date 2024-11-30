export class tabInterface {
    constructor() {
        // Define color variables
        this.colors = {
            // dark mode colors by default 
            tabBarBackground: "#333",
            tabButtonBackground: "#333",
            activeTabBackground: "#007bff",
            activeTabBorder: "pink",
            inactiveTabBorder: "none"
        };

        this.tabs = [];
        this.activeTab = 0;

        // Create the main container for the tab interface
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.width = "100%";
        this.container.style.height = "100%";

        // Create the tab bar
        this.tabBar = document.createElement("div");
        this.tabBar.style.height = "50px";
        this.tabBar.style.display = "flex";
        this.tabBar.style.backgroundColor = this.colors.tabBarBackground;
        this.tabBar.style.borderBottom = `2px solid ${this.colors.inactiveTabBorder}`;
        this.container.appendChild(this.tabBar);

        // Create the content area
        this.contentArea = document.createElement("div");
        this.contentArea.style.flexGrow = "1";
        this.contentArea.style.overflow = "auto";
        this.container.appendChild(this.contentArea);
    }

    createTab(name) {
        const tabIndex = this.tabs.length;

        // Create the tab button
        const tabButton = document.createElement("button");
        tabButton.textContent = name;
        tabButton.style.flexGrow = "1";
        tabButton.style.border = "none";
        tabButton.style.backgroundColor = this.colors.tabButtonBackground;
        tabButton.style.cursor = "pointer";
        tabButton.style.outline = "1px solid black";
        tabButton.style.padding = "10px";
        tabButton.style.transition = "background-color 0.3s";

        // Highlight the active tab
        const updateTabStyles = () => {
            this.tabBar.childNodes.forEach((btn, idx) => {
                if (idx === this.activeTab) {
                    btn.style.backgroundColor = this.colors.activeTabBackground;
                    btn.style.borderBottom = `2px solid ${this.colors.activeTabBorder}`;
                } else {
                    btn.style.backgroundColor = this.colors.tabButtonBackground;
                    btn.style.borderBottom = this.colors.inactiveTabBorder;
                }
            });
        };

        // Set click event for the tab button
        tabButton.addEventListener("click", () => {
            this.activeTab = tabIndex;
            this.showActiveTab();
            updateTabStyles();
        });

        // Add the tab to the tab bar
        this.tabBar.appendChild(tabButton);

        // Create the tab content element
        const tabContent = document.createElement("div");
        tabContent.style.padding = "10px";
        tabContent.style.height = "100%";

        // Store the tab data
        this.tabs.push({ name, element: tabContent });

        // Show the first tab by default
        if (this.tabs.length === 1) {
            this.showActiveTab();
            updateTabStyles();
        }

        return tabContent; // Return the newly created content element
    }

    switchToTab(tabName) {
        // case insensitive search
        const idx = this.tabs.findIndex(tab => tab.name.toLowerCase() === tabName.toLowerCase());
        if (idx !== -1) {
            this.activeTab = idx;
            this.showActiveTab();
            this.tabBar.childNodes.forEach((btn, idx) => {
                if (idx === this.activeTab) {
                    btn.style.backgroundColor = this.colors.activeTabBackground;
                    btn.style.borderBottom = `2px solid ${this.colors.activeTabBorder}`;
                } else {
                    btn.style.backgroundColor = this.colors.tabButtonBackground;
                    btn.style.borderBottom = this.colors.inactiveTabBorder;
                }
            });
        }
    }

    showActiveTab() {
        // Clear the content area
        this.contentArea.innerHTML = "";

        // Add the active tab's content
        const activeTab = this.tabs[this.activeTab];
        if (activeTab) {
            this.contentArea.appendChild(activeTab.element);
        }
    }

    getElement() {
        return this.container;
    }

    // Method to update colors dynamically
    updateColors(newColors) {
        this.colors = { ...this.colors, ...newColors };

        // Apply updated colors to the tab bar
        this.tabBar.style.backgroundColor = this.colors.tabBarBackground;
        this.tabBar.childNodes.forEach((btn, idx) => {
            if (idx === this.activeTab) {
                btn.style.backgroundColor = this.colors.activeTabBackground;
                btn.style.borderBottom = `2px solid ${this.colors.activeTabBorder}`;
            } else {
                btn.style.backgroundColor = this.colors.tabButtonBackground;
                btn.style.borderBottom = this.colors.inactiveTabBorder;
            }
        });
    }
}

